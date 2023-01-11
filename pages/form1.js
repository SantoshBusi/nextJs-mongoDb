import clientPromise from "../lib/mongodb";
export default function form1 (props){
    console.log(props)
    return(
        <>
        </>
    )
}
export async function getStaticProps() {
    try {
        const client = await clientPromise;
        const db = client.db("my_db");

        const db_1 = await db
            .collection("db_1")
            .find({})
            .sort({ metacritic: -1 })
            .limit(1000)
            .toArray();

        return {
            props: { db_1: JSON.parse(JSON.stringify(db_1)) },
        };
    } catch (e) {
        console.error(e);
    }
}