module.exports = function(RED) {
	'use strict';
	const KeybleStatusNode = function(configuration) {
		const node = this;
		RED.nodes.createNode(node, configuration);
		node.connection = RED.nodes.getNode(configuration.connection);
		node.connection.key_ble.on('status_update', async (status) => {
			await node.send({payload:status});
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
	RED.nodes.registerType('keyble-status', KeybleStatusNode);
}
