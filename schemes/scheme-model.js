const db = require("../data/db-Config.js")

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

//`find()`:
// Calling find returns a promise that resolves to an array of all schemes in the database.
// No steps are included.
function find(){
    return db("schemes");
}


//`findById(id)`:
// Expects a scheme `id` as its only parameter.
// Resolve to a single scheme object.
// On an invalid `id`, resolves to `null`.
function findById(id){
    return db("schemes")
        .where({ id })
        .first();
}

//`findSteps(id)`:
// Expects a scheme `id`.
// Resolves to an array of all correctly ordered step for the given scheme: `[ { id: 17, scheme_name: 'Find the Holy Grail', step_number: 1, instructions: 'quest'}, { id: 18, scheme_name: 'Find the Holy Grail', step_number: 2, instructions: '...and quest'}, etc. ]`.
// This array should include the `scheme_name` _not_ the `scheme_id`.

// select st.id, sc.scheme_name, st.step_number, st.instructions 
// from steps as st
// join schemes as sc
//     on st.scheme_id = sc.id
// where scheme_id = 1
// order by st.step_number;

function findSteps(id){
    return db("steps as st")
    .select("st.id", "sc.scheme_name", "st.step_number", "st.instructions")
    .join("schemes as sc", "st.scheme_id", "sc.id")
    .where("scheme_id", id)
    .orderBy("st.step_number");
}

//`add(scheme)`:
// Expects a scheme object.
// Inserts scheme into the database.
// Resolves to the newly inserted scheme, including `id`.
function add(scheme){
    return db("schemes")
    .insert(scheme, "id")
    .then(ids => {
        const [id] = ids;

        return findById(id);
    })
}

// `update(changes, id)`:
//  Expects a changes object and an `id`.
//  Updates the scheme with the given id.
//  Resolves to the newly updated scheme object.
function update(changes, id){
    const updatedScheme = findById(id);
    return db("schemes")
    .where({ id })
    .update(changes, "id")
    .then(count => {
        if (count > 0){
            findById(id)
            return updatedScheme
            }
        })
}

//`remove(id)`:
// Removes the scheme object with the provided id.
// Resolves to the removed scheme
// Resolves to `null` on an invalid id.
// (Hint: Only worry about removing the `scheme`. The database is configured to automatically remove all associated steps.)
function remove(id){
    return db('schemes')
    .where({ id })
    .first()
    .then(scheme => {
            return db('schemes')
            .where({ id })
            .del()
            .then(count => {
                if (count > 0){
                return scheme;
                }
            })
        }
    )
}