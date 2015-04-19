import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend({
  serialize(record) {
    let json = this._super.apply(this, arguments);

    json.id = record.id;

    return json;
  }
});
