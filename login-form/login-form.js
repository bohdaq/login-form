(function (polymer) {
	'use strict';

	polymer({
		is: 'login-form',

		properties: {
			isSucceeded: {
				type: Boolean,
				value: false
			}
		},

		listeners: {},

		attached: function () {
			console.log('attached');
		},

		getParameterByName: function (name, url) {
			if (!url) {
				url = window.location.href;
			}
			name = name.replace(/[\[\]]/g, "\\$&");
			var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
				results = regex.exec(url);
			if (!results) return null;
			if (!results[2]) return '';
			return decodeURIComponent(results[2].replace(/\+/g, " "));
		},

		_signUp: function () {
			var isValid = this.$.name.validate() && this.$.email.validate();
			if(!isValid){
				return;
			}
			var ajax = this.querySelector('iron-ajax');
			ajax.url = ajax.url + this.getParameterByName('param');
			
			ajax.body = {
				name: this.name,
				email: this.email
			};
			ajax.generateRequest();
		},
		handleResponse: function (ev, data) {
			this.isSucceeded = true;
		}
	});
})(Polymer);
