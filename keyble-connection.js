module.exports = function (RED) {
	'use strict';
	const {Key_Ble, utils:{canonicalize_hex_string, canonicalize_mac_address}} = require('keyble');
	const KeybleConnectionNode = function(configuration) {
		const node = this;
		RED.nodes.createNode(node, configuration);
		node.name = configuration.name;
		node.address = canonicalize_mac_address(node.credentials.address);
		node.user_id = parseInt(node.credentials.user_id);
		node.user_key = canonicalize_hex_string(node.credentials.user_key);
		node.key_ble = new Key_Ble({
			address: node.address,
			user_id: node.user_id,
			user_key: node.user_key,
		});
		node.on('close', function(removed, done) {
			// tidy up any state
			if (removed) {
				// This node has been disabled/deleted
			} else {
				// This node is being restarted
			}
			done();
		});
	}
	RED.nodes.registerType('keyble-connection', KeybleConnectionNode, {
		credentials: {
			address: {type:'text'},
			user_id: {type:'text'},
			user_key: {type:'password'},
		},
	});
}
