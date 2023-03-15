const fastify = require('fastify')({logger:true});
const https = require('https');

fastify.get("/", async(request,response) => {
    console.log(request.query);
    var searchResult = await search(request.query);
    console.log(searchResult)
    response
    .header('Content-Type', 'text/html; charset=utf-8')
    .code(200)
    .send(searchResult)
})

async function  search(query){
   const searchPromise = new Promise(function(resolve,reject){
    const url = 'https://duckduckgo.com/?q=test&ia=web';    
    let data = "";
    try{
        https.get(url, resp => {
            resp.on('data',chunk => {
                data = data + chunk;
            })
    
            resp.on('end',()=>{
                console.log(data)
                resolve(data)
            })
        })
        
    }catch(error){
        reject(error);
    }
   });
   return searchPromise;
}

const start = async () => {
    try {
      await fastify.listen(3333)
      fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start()