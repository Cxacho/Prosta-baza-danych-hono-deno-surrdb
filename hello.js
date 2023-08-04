import { Hono } from "https://deno.land/x/hono@v3.3.4/mod.ts";
//import { serveStatic } from "https://deno.land/x/hono@v3.3.4/middleware.ts"
import Surreal from "https://deno.land/x/surrealdb@v0.8.3/mod.ts";

const app = new Hono();

const db = new Surreal("http://127.0.0.1:8000/rpc");

async function main(){
try{
    await db.signin({
        user: 'root',
        pass: 'root',
    });

    await db.use({ ns: "testuje", db: "test"});

    const existingData = await db.select("osoba");

    if (!existingData || existingData.length === 0) {

        console.log("Dodawanie oosby");

    db.create("osoba",{
        tytul: "Inż",
        name: {
            imie: "Michal",
            nazwisko: "Czachowski",
        },
        m: true,
        id: 1,
    })

    }
    else{
        console.log("Osoba jest już dodana");
    }

    const data = await db.select("osoba");
        
    console.log(data);
 
}
catch (e) {
    console.error("ERROR", e);
}
}

main()


