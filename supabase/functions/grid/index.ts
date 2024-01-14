// Reference Example:
// https://github.com/supabase/supabase/blob/master/examples/edge-functions/supabase/functions/file-upload-storage/index.ts

import { Application } from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

// const SUPABASE_URL = "https://ojullbbmxmiqbuqncwfm.supabase.co"
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')
const MB = 1024 * 1024

const app = new Application()
console.log("URL ", SUPABASE_URL)
console.log("Anon-key ", SUPABASE_ANON_KEY)

app.use(async (ctx) => {
  const body = ctx.request.body({ type: 'form-data' })
  const formData = await body.value.read({
    // Need to set the maxSize so files will be stored in memory.
    // This is necessary as Edge Functions don't have disk write access.
    // We are setting the max size as 10MB (an Edge Function has a max memory limit of 150MB)
    // For more config options, check: https://deno.land/x/oak@v11.1.0/mod.ts?s=FormDataReadOptions
    maxSize: 10 * MB,
  })
  if (!formData.files || !formData.files.length) {
    ctx.response.status = 400
    ctx.response.body = 'missing file'
    return
  }

  const supabaseClient = createClient(
    SUPABASE_URL!,
    SUPABASE_ANON_KEY!
  )

  //upload image to Storage
  const file = formData.files[0]
  console.log("File: ", file)
  const timestamp = +new Date()
  const uploadName = `${file.name}-${timestamp}`
  const { data: upload, error: uploadError } = await supabaseClient.storage
    .from('inbound')
    .upload(uploadName, file.content!.buffer, {
      contentType: file.contentType,
      cacheControl: '3600',
      upsert: false,
    })
  if (uploadError) {
    console.error(uploadError.message)
    ctx.response.status = 500
    ctx.response.body = `${uploadError.message}`
    return
  }

  // insert record to messages table
  // const { error } = await supabaseClient.from('inbound_emails').insert({
  //   message: formData.fields!.message || '',
  //   image_path: upload.path,
  // })
  // if (error) {
  //   console.error(error)
  //   ctx.response.status = 500
  //   ctx.response.body = `${error.details}}`
  //   return
  // }

  ctx.response.status = 201
  ctx.response.body = 'Success!'
})
 
await app.listen({ port: 8000 })