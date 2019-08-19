$(document).ready( function() {
    app.initialized()
        .then(function(_client) {
          var client = _client;          
          client.events.on('app.activated',
            function() {
                client.data.get('contact')
                    .then(function(data) {
                        console.log("DATA=", data);
                        $('#apptext').text("Ticket created by " + data.contact.name);
                        console.log("CONTACT DETAILS: ", data.contact);
                        
                        $('.logobtn').click(function() {                            
                            client.interface.trigger("showModal", {
                                title: "Organization Profile",
                                template: "modal.html",
                                data: {name: ((data || {}).contact||{}).name, email: ((data || {}).contact||{}).email}
                            })
                            .then(function(data) {
                                // $('#user_name').text("Ticket created by " + data.contact.name);
                                console.log('MODAL LOADED SUCCESSFULLY-2');
                            })
                            .catch(function(error) {
                                console.log('MODAL COULD NOT BE LOADED SUCCESSFULLY, ERROR=', error);
                            });
                        });

                        // $('#user_name').text("Ticket created by " + data.contact.name);
                    })
                    .catch(function(e) {
                        console.log('Exception - ', e);
                    });
            });
    });
});
