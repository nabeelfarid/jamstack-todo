var faunadb = require("faunadb");
const q = faunadb.query;

var client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

(async () => {
  try {
    // var result = await client.query(
    //   q.Update(q.Ref(q.Collection("todos"), "297230535658310152"), {
    //     data: {
    //       done: true,
    //       owner: "tester2",
    //     },
    //   })
    // );
    // console.log(result);

    // let results = await client.query(
    //   q.Paginate(q.Match(q.Index("todos_by_owner"), "tester"))
    // );

    // results = results.data.map(([ref, title, done]) => ({
    //   id: ref.id,
    //   title,
    //   done,
    // }));
    // console.log(JSON.stringify(results, null, 4));

    // Let(
    //     {
    //       doc: Get(Match(Index("dept_by_deptno"), 10)),
    //     },
    //     Update(
    //       Select(["ref"], Var("doc"),
    //       {
    //         data: {
    //           counter: Add(1, Select(["data", "counter"], Var("DOC")))
    //         }
    //       }
    //     )
    //   )

    let a = {
      name: "todos_by_owner",
      unique: false,
      serialized: true,
      source: "todos",
      terms: [
        {
          field: ["data", "owner"],
        },
      ],
      values: [
        {
          field: ["ref"],
        },
        {
          field: ["data", "title"],
        },
        {
          field: ["data", "done"],
        },
      ],
    };
    const id = "297235217245012493";
    let results = await client.query(
      q.Let(
        {
          doc: q.Get(q.Ref(q.Collection("todos"), id)),
          ref: q.Select(["ref"], q.Var("doc")),
          done: q.Select(["data", "done"], q.Var("doc")),
        },

        q.Update(q.Var("ref"), {
          data: { done: q.Not(q.Var("done")) },
        })
        // q.Var("doc")
      )

      // (q.Match(q.Index("todos_by_owner"), "tester"))
    );

    console.log(results);
  } catch (error) {
    console.log(JSON.stringify(error, null, 4));
  }
})();

// [1, 2, 3].forEach(async (i) => {
//   try {
//     var createP = await client.query(
//       q.Create(q.Collection("todos"), {
//         data: {
//           title: "laundary" + i,
//           done: false,
//           owner: "tester",
//           created: Date.now(),
//         },
//       })
//     );
//     console.log(createP);
//   } catch (error) {
//     console.log(JSON.stringify(error, null, 4));
//   }
// });
