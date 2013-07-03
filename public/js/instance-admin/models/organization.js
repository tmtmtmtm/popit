define( [ 'Backbone',
    'instance-admin/models/nested',
    'instance-admin/collections/contacts',
    'instance-admin/collections/other_names',
    'instance-admin/collections/links'
],
function ( Backbone, NestedModel, ContactCollection, OtherNamesCollection, LinkCollection ) {
  "use strict"; 

  return NestedModel.extend({
    urlRoot: '/api/v0.1/organizations',

    set: function(attrs, options) {
      this.nest('links', LinkCollection, attrs);
      this.nest('contact_details', ContactCollection, attrs);
      this.nest('other_names', OtherNamesCollection, attrs);
      return Backbone.Model.prototype.set.call(this, attrs, options);
    },

    initialize: function() {
      Backbone.on('in-place-edit', this.inPlaceEdited, this);
    },

    inPlaceEdited: function(chg) {
      this.save(chg);
    },

    schema: {
      name: { dataType: 'Text', validators: ['required'] },
      slug: { dataType: 'Text', validators: ['required'] }
    }
  });

});