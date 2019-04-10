// CONSTANTS
// const enrollment_list_endpoint = "http://127.0.0.1:8000/api/enrollments";
// const endpoint = "http://127.0.0.1:8000/api/enrollments/";
const root = "https://banana-tart-91724.herokuapp.com";
const enrollment_list_endpoint = "/api/enrollments/";
const parent_list_endpoint = "/api/parents/";
const child_list_endpoint = "/api/children/";
const activity_list_endpoint = "/api/activities/";
const activity_create_endpoint = "/api/make_activity/";
const enrollment_rud_endpoint = "/api/rud_enrollment/"; //retrieve, update, destroy endpoint
const enrollment_create_endpoint = '/api/create_enrollment/';

function error_handler(err) {
    console.log(err);
}

export function update_enrollment(e_id, on_success, on_error=(error_handler), new_confirmation_status=true) {
    const confirm_endpoint = root + enrollment_rud_endpoint + e_id + "/";
    const confirmation_update = {
        confirmed: new_confirmation_status // defaults to true for EnrollmentUpdate use case, can make it false for admin portal
    }
    const content = {
        method: "PATCH", // patch for partial update would work for updating ()
        body: JSON.stringify(confirmation_update),
        headers: new Headers({ "Content-Type": "application/json" })
    };
    fetch(confirm_endpoint, content)
    .then(response => {
        if (response.status !== 200) {
            on_error(response);
        } else {
            return response.json();
        }
    })
    .then(data => on_success(data));
}

export function create_enrollment(e_data, on_success, on_error=(error_handler)) {
    const create_endpoint = root + enrollment_create_endpoint;
    const content = {
        method: "POST", // patch for partial update would work for updating ()
        body: JSON.stringify(e_data),
        headers: new Headers({ "Content-Type": "application/json" })
    };
    fetch(create_endpoint, content)
    .then(response => {
        if (response.status !== 200) {
            on_error(response);
        } else {
            return response.json();
        }
    })
    .then(data => on_success(data));
}

export function get_enrollment(e_id, on_success, on_error=(error_handler)) {
    const get_endpoint = root + enrollment_rud_endpoint + e_id + "/";
    const content = {
        method: "GET", // delete would work for, well, deleting
    };

    fetch(get_endpoint, content)
    .then(response => {
        if (response.status !== 200) {
            on_error(response);
        } else {
            return response.json();
        }
    })
    .then(data => on_success(data));

}

export function destroy_enrollment(e_id, on_success, on_error=(error_handler)) {
    const destroy_endpoint = root + enrollment_rud_endpoint + e_id + "/";
    const content = {
        method: "DELETE", // delete would work for, well, deleting
    };

    fetch(destroy_endpoint, content)
    .then(response => {
        if (response.status !== 200) {
            on_error(response);
        } else {
            return response.json();
        }
    })
    .then(data => on_success(data));

}
// Enrollment
export function fetch_all_enrollments(on_success, on_error=(error_handler)) {
    const stuff = {
        // headers: new Headers({'Access-Control-Allow-Origin': '*'})
        method: "GET",
        // body: JSON.stringify(user),
        // headers: new Headers({ "Content-Type": "application/json" })
    };
    const real_endpoint = root + enrollment_list_endpoint;
    fetch(real_endpoint)
    .then(response => {
        if (response.status !== 200) {
            on_error(response);
        } else {
            return response.json();
        }
    })
    .then(data => on_success(data));
}

export function fetch_all_activities(on_success, on_error=(error_handler)) {
    const real_endpoint = root + activity_list_endpoint;
    fetch(real_endpoint)
    .then(response => {
        if (response.status !== 200) {
            on_error(response);
        } else {
            return response.json();
        }
    })
    .then(data => on_success(data));
}

export function create_activity(activity_information) {
    const real_endpoint = root + activity_create_endpoint;
    const conf = {
        method: "POST",
        body: JSON.stringify(activity_information),
        headers: new Headers({ "Content-Type": "application/json" })
    };
    fetch(real_endpoint, conf).then(response => console.log(response));
}