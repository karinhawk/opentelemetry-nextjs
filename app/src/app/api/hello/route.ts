export async function GET() {
    return new Response(JSON.stringify({"hello": "there"}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }