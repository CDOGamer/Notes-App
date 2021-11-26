
export default {
    data: () => ({
        check: false,
        tokenCheck: true,
        backend: "http://localhost:3000"
    }),
    methods: {
        async fatch(endpoint, variables){
            //var _this = this;
            var url = "";
            var fetchMethod = "";
            var b0dy= null;
            switch(endpoint) {
                // Notes endpoints
                case "getNotes":
                    url = this.backend + "/getNotes";
                    fetchMethod = "GET";
                    break;
                case "addNote":
                    url = this.backend + "/addNote";
                    fetchMethod = "POST";
                    b0dy = JSON.stringify({"note":variables})
                    break;
                case "deleteNote":
                    url = this.backend + "/deleteNote";
                    fetchMethod = "DELETE";
                    b0dy = JSON.stringify({"index":variables})
                }
                // Set the fetch with variables
                var resfetch = await fetch(url, {method: fetchMethod,
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    body: b0dy})
                    .then(async function(response){return response.json();})
                    .then(async function (data) {return data;})
                    return resfetch;
        },
    }
}
