module.exports = function(RED) {
	'use strict';
	const KeybleSendCommandNode = function(configuration) {
		const node = this;
		RED.nodes.createNode(node, configuration);
		node.connection = RED.nodes.getNode(configuration.connection);
		node.on('input', function(msg, send, done) {
			send = (send || ((...args) => {node.send.apply(node, args)}));
			const command = msg.payload.trim().toLowerCase();
			const command_function = {'open':'open', 'lock':'lock', 'unlock':'unlock', 'toggle':'toggle'}[command];
			node.connection.key_ble[command_function]().then(() => {
				if (done) {
					done();
				}
			});
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
	RED.nodes.registerType('keyble-send_command', KeybleSendCommandNode);
}
