import { fail, redirect } from '@sveltejs/kit'
import { db } from '$lib/server/db';
import { tenementsSummary } from '@/server/schema';
import { eq } from 'drizzle-orm';

export const load = async ({ locals: { supabase, getSession } }: { locals: App.Locals }) => {
  const session = await getSession()

  if (!session) {
    throw redirect(303, '/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select(`first_name, last_name, company`)
    .eq('id', session.user.id)
    .single()

  const tenements_summary = await db
    .select()
    .from(tenementsSummary)
    .where(eq(tenementsSummary.owner, session.user.id))
    .execute();

  // const { data: tenements_summary } = await supabase
  // .from('tenements_summary')
  // .select('*')

  return { session, tenements_summary, profile }
}

export const actions = {
  update: async (event: any) => {
    {
      const data = Object.fromEntries(await event.request.formData())
      const dataStr = JSON.stringify(data);
      const dataObj = JSON.parse(dataStr);
      const recordsToUpdate = JSON.parse(dataObj["newData"]);
      // TODO - validate allowed columns and value data type
      const allowColumns = {
        "rentPerSubBlock": "string",
        "enviroFeePA": "number", 
        "enviroFeePaid": "boolean", 
        "enviroAuthority": "string", 
        "security": "string", 
        "rentPaid": "boolean", 
        "rentPA": "number", 
        "eaDate": "Date", 
        "eaType": "string"
      }
      
      for (let record of recordsToUpdate) {
        console.log(record)
        if (allowColumns.hasOwnProperty(record.columnId) && !isNaN(record.newValue)) {
          let updateObject: Record<string, unknown> = {};
          updateObject[record.columnId] = record.newValue;
          await db.update(tenementsSummary)
            .set(updateObject)
            .where(eq(record.tenement, tenementsSummary.tenement));
          console.log("updated ", record.tenement, " with ", updateObject)
        } else {
          continue;
        }
       }



      // log the form data which is a json.stringify 
      // console.log(event.body)
      // if (event.body) {
      //   const formData = JSON.parse(event.body);
      //   console.log(formData)
      // } else {
      //   console.error("Request body is undefined");
      // }
    }
  }
}