// view package menu

var needle = require('needle');

module.exports = {
  // function sendMenu(senderID)

  	sendMenu: function(senderID,items){
	  console.log('send Menu');
	  
	  var elements = [];
	  items.forEach(function(item){
	    elements.push({
	      title: item.title,
	      subtitle: item.subtitle,
	      image_url: item.image_url,
	      buttons:[{
	        type: 'postback',
	        title: 'ADD to Cart',
	        payload: item.payload
	      }]
	    });
	  });
	  // console.log(elements);

	  var messageData = {
	    recipient: {
	      id: senderID
	    },
	    message: {
	      attachment: {
	        type: "template",
	        payload: {
	          template_type: "generic",
	          elements: elements
	        }
	      }
	    }
	  };  

	  return messageData;
	},


	// function sendCart(senderID){
	sendCart: function(senderID,items,PAGE_ACCESS_TOKEN){
	  var link = 'https://graph.facebook.com/v2.8/'+senderID+'?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token='+PAGE_ACCESS_TOKEN;

	  needle.get(link, function(error, response) {
	    if (!error){
	      console.log(response.body);
	      var receiptId = "order" + Math.floor(Math.random()*1000);

	      var elements = [];
	      items.forEach(function(item){
	        elements.push({
	          title: item.title,
	          subtitle: item.subtitle,
	          image_url: item.image_url,
	          quantity: 1,
	          price: 599.00,
	          currency: "PHP"
	        });
	      });

	      var messageData = {
	        recipient: {
	          id: senderID
	        },
	        message:{
	          attachment: {
	            type: "template",
	            payload: {
	              template_type: "receipt",
	              recipient_name: response.body.first_name+' '+response.body.last_name,
	              order_number: receiptId,
	              currency: "USD",
	              payment_method: "Visa 1234",        
	              timestamp: "1428444852", 
	              elements: elements,
	              summary: {
	                subtotal: 698.99,
	                shipping_cost: 20.00,
	                total_tax: 57.67,
	                total_cost: 626.66
	              },
	              adjustments: [{
	                name: "New Customer Discount",
	                amount: -50
	              }, {
	                name: "$100 Off Coupon",
	                amount: -100
	              }]
	            }
	          }
	        }
	      };

	      return messageData;
	    }
	  });

	  
	}





};