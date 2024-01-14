// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

const RESEND_API_KEY = Deno.env.get("RESEND_API");
console.log("Hello from Functions!");

Deno.serve(async (req) => {
  const formData = await req.formData();
  const data = Object.fromEntries(formData.entries());

  let dataFields = "";
  for (const [key, _] of formData.entries()) {
    dataFields += `${key}\n`;
  }
  // const attach = formData.get("attachment1");

  const fileBytes = await Deno.readFile("attachment1");
  const decoder = new TextDecoder('utf-8');
  const fileString = decoder.decode(fileBytes);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Nathan @ Canela Spatial <nathan@canelaspatial.au>",
      to: ["mrbagholder@gmail.com"],
      subject: "hello world",
      html:
        `Data: ${data.from}, fields: ${dataFields}, 
      attachments: ${data.attachments}, attachment1: ${data.attachment1}: attach type: ${typeof data.attachment1}`,
      attachments: [
        { 
          content: fileString,
        },
      ],
      // html: `${JSON.stringify(data)}`,
      // html: `"<strong>${data.from} & ${data.subject}</strong>"`,
    }),
  });

  const response = await res.json();

  return new Response(
    JSON.stringify(response),
    { headers: { "Content-Type": "application/json" } },
  );
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/sendgrid' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
