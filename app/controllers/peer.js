/* global io */

import Ember from 'ember';
import ENV from 'sidemirror/config/environment';

export default Ember.Controller.extend({
  actions: {
    ready: function(data) {
      this.get('store').pushPayload('person', data);

      var other = this.get('store').getById('person', data.person.id);
      var peer  = this.setupPeer(other);

      peer.createOffer((description) => {
        peer.setLocalDescription(description, () => {
          var person = this.get('session.person');

          this.message('offer', { person: person.serialize(), description: description }, other.get('socketId'));
        });
      });
    },

    offer: function(data) {
      this.get('store').pushPayload('person', { person: data.person });

      var other = this.get('store').getById('person', data.person.id);
      var peer  = this.setupPeer(other);

      peer.setRemoteDescription(new window.RTCSessionDescription(data.description), () => {
        peer.createAnswer((description) => {
          var person = this.get('session.person');

          peer.setLocalDescription(description, () => {
            this.message('answer', { description: description, from: person.get('id') }, other.get('socketId'));
          });
        });
      });
    },

    answer: function(data) {
      var other       = this.get('store').getById('person', data.from);
      var description = new window.RTCSessionDescription(data.description);

      other.get('peer').setRemoteDescription(description);
    },

    candidate: function(data) {
      var other     = this.get('store').getById('person', data.from);
      var candidate = new window.RTCIceCandidate(data.candidate);

      other.get('peer').addIceCandidate(candidate);
    }
  },

  subscribe: function() {
    var socket = io.connect(ENV.config.socketURL);
    var person = this.get('session.person');

    this.get('socket').set('instance', socket);

    socket.on('connect', () => {
      person.set('socketId', socket.id);

      this.message('ready', { person: person.serialize() });
    });

    socket.on('message', (data) => {
      this.send(data.type, data.payload);
    });
  },

  message: function(type, payload, recipient) {
    this.get('socket.instance').emit('message', { type: type, payload: payload, recipient: recipient });
  },

  setupPeer: function(other) {
    var person = this.get('session.person');
    var peer   = new window.webkitRTCPeerConnection({ iceServers: [] });

    peer.addStream(person.get('stream'));

    peer.onicecandidate = (e) => {
      if (e.candidate) {
        this.message('candidate', { candidate: e.candidate, from: person.get('id') }, other.get('socketId'));
      }
    };

    peer.onaddstream = (e) => other.set('stream', e.stream);

    peer.oniceconnectionstatechange = () => {
      switch (peer.iceConnectionState) {
        case 'failed':
        case 'disconnected':
        case 'closed':
          this.get('store').unloadRecord(other);
          break;

        default:
          // NOP
      }
    };

    other.set('peer', peer);

    return peer;
  }
});
