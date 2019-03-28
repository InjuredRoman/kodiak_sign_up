// CONSTANTS
const enrollment_list_endpoint = "http://127.0.0.1:8000/api/enrollments"

function error_handler(err) {
    console.log(err);
}

// Enrollment
export function fetch_all_enrollments(on_success, on_error=(error_handler)) {
    const stuff = {
        headers: new Headers({'Access-Control-Allow-Origin': '*'})
    }
    // fetch(enrollment_list_endpoint, {mode: 'no-cors'})
    fetch(enrollment_list_endpoint, stuff)
    .then(response => {
        if (response.status !== 200) {
            on_error(response);
        } else {
            console.log(response);
            return response.json();
        }
    })
    .then(data => on_success(data));
}