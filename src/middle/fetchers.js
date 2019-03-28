// CONSTANTS
const enrollment_list_endpoint = "http://127.0.0.1:8000/api/enrollments"
const endpoint = "http://127.0.0.1:8000/api/enrollments/"

function error_handler(err) {
    console.log(err);
}

// Enrollment
export function fetch_all_enrollments(on_success, on_error=(error_handler)) {
    const stuff = {
        // headers: new Headers({'Access-Control-Allow-Origin': '*'})
        method: "GET",
        // body: JSON.stringify(user),
        // headers: new Headers({ "Content-Type": "application/json" })
    };
    // fetch(enrollment_list_endpoint, {mode: 'no-cors'})
    // console.log(content);
    // on_success(content);
    // fetch(enrollment_list_endpoint)
    // .then(response => {
    //     if (response.status !== 200) {
    //         on_error(response);
    //     } else {
    //         console.log(response);
    //         return response.json();
    //     }
    // })
    // .then(data => on_success(data));
}