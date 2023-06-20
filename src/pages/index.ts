export async function get() {
   return new Response(JSON.stringify({messagge: "gino"}), {
      status: 200,
      headers: {"content-type" : "application/json"},
   })
}