'use strict';
const details_get_url = 'https://uat-api.cogoport.com/api/v1/organizations/profile';

$(document).ready(function() {
  app.initialized()
  .then(function(_client) {
    var client = _client;    
    var userData = {};
    var url = details_get_url;
    client.instance.context()
    .then(function(context) {
      userData = context.data;      
      url = url + '?email=' + userData.email;      
      client.request.get(url, {})
        .then(
            function(data) {
                let response = JSON.parse(data.response);                
                $('.timeline-wrapper').attr('style', 'display: none;');
                $('#organization_details').attr('style', 'display: block;');
                $('#users_details').attr('style', 'display: block;');
                $('#shipments_details').attr('style', 'display: block;');
                if(data.status !== 200) {
                    toastr.error('SOME ERROR OCCURRED WHILE LOADING PROFILE INFORMATION');
                }

                var template = '<div><h3 class="heading">${organization.business_name.toUpperCase()}</h3>\
                                <p class="orgtype">${organization.type.toUpperCase()}</p>\
                                </div>';

                var org_users_template = '<tr><td>${user.name}</td><td>${user.email}</td><td>${user.phone_no}</td></tr>'; 
                                          
                var shipments_template = '<tr>\
                                            <td>${commodity.name}</td>\
                                            <td>${commodity.hs_code}</td>\
                                            <td>${container_size}</td>\
                                            <td>${container_type}</td>\
                                            <td>${origin_port.display_name}</td>\
                                            <td>${destination_port.display_name}</td>\
                                          </tr>';

                $.tmpl( template, response.data).appendTo('#organization_details');
                $.tmpl( org_users_template, response.data).appendTo('#users_table');

                for(var i=0; i<response.data.shipments.length; i++) {                    
                    $.tmpl( shipments_template, response.data.shipments[0]).appendTo('#shipments_table');
                }                
            },
            function(error) {
                console.error('AN ERROR OCCURRED: ', error);
            }
        );
    });

    

    // $('.manage-bookmarks').on('click', '.remove-bookmark', function() {
    //   var ticketId = $(this).parents('.manage-bm-li').data('ticketId');
    //   $(this).parents('.manage-bm-li').remove();
    //   client.instance.send({ 
    //     message: {type: 'removeTicket', ticketId: ticketId}
    //   }); 
    // });
  });
});