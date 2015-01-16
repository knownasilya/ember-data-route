import Ember from 'ember';

export default Ember.Mixin.create({
  resetController: function() {
    var model = this.get('controller.model');
    if(!model.get('isDeleted')) {
      if (model.get('isNew')) {
        model.deleteRecord();
      } else {
        model.rollback();
      }
    }
  },
  actions: {
    willTransition: function(transition) {
      var model = this.get('controller.model');
      if (model.get('isDirty') && !this.willTransitionConfirm(transition)) {
        transition.abort();
      }
    }
  },
  willTransitionConfirm: function(transition) {
    /*jshint unused:false*/
    var config = this.container.lookup('config:environment');
    var addonConfig = config['ember-data-route'];

    if (addonConfig && addonConfig.defaultConfirm) {
      return confirm(addonConfig.defaultConfirm);
    }

    return true;
  }
});
