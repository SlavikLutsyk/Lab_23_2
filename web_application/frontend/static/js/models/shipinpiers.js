class shipInPiers extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
  constructor() {
      super('shipinpierss')
      this.fields = this.fields.concat([
          'ship',
          'pier'
      ])
  }
}