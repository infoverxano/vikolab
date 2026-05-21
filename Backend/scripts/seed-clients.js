import "dotenv/config";
import { db } from "../db/index.js";
import { clients } from "../db/schema.js";
import { randomUUID } from "crypto";

const sampleClients = [
{
id: randomUUID(),
name:"John Smith",
first_name:"John",
last_name:"Smith",
email:"john@demo.com",
phone:"+212600000001",
company:"Atlas Media",
city:"Casablanca",
country:"Morocco",
address:"Maarif",
website:"https://atlasmedia.ma",
status:"active",
notes:"Important client"
},

{
id: randomUUID(),
name:"Sara Johnson",
first_name:"Sara",
last_name:"Johnson",
email:"sara@demo.com",
phone:"+212600000002",
company:"Viko Fashion",
city:"Rabat",
country:"Morocco",
address:"Agdal",
website:"https://vikofashion.com",
status:"active",
notes:"Needs branding"
},

{
id: randomUUID(),
name:"Omar Benali",
first_name:"Omar",
last_name:"Benali",
email:"omar@demo.com",
phone:"+212600000003",
company:"Benali Print",
city:"Marrakech",
country:"Morocco",
address:"Guéliz",
website:"https://benaliprint.com",
status:"lead",
notes:"Potential client"
},

{
id: randomUUID(),
name:"Leila Haddad",
first_name:"Leila",
last_name:"Haddad",
email:"leila@demo.com",
phone:"+212600000004",
company:"Creative Hub",
city:"Tangier",
country:"Morocco",
address:"Center",
website:"https://creativehub.ma",
status:"active",
notes:"Recurring customer"
},

{
id: randomUUID(),
name:"Youssef Karim",
first_name:"Youssef",
last_name:"Karim",
email:"youssef@demo.com",
phone:"+212600000005",
company:"YK Studio",
city:"Agadir",
country:"Morocco",
address:"Hay Salam",
website:"https://ykstudio.ma",
status:"inactive",
notes:"Follow up needed"
}
];

try {

await db.insert(clients).values(sampleClients);

console.log("✅ 5 clients seeded successfully");

} catch(error){
console.error(error);
}

process.exit();