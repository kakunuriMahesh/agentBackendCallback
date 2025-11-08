const {Schema, model} = require('mongoose');

const jobStatusSchema = new Schema(
  {
    jobId: {type: String, required: true, index: true},
    status: {
      type: String,
      enum: ['queued', 'running', 'done', 'failed'],
      required: true,
    },
    body: Schema.Types.Mixed,
    output: Schema.Types.Mixed,
    updatedAt: {type: Date, default: Date.now},
  },
  {
    timestamps: true,
    collection: 'n8n_jobs', // <— exact collection name in Mongo
  }
);

module.exports = model('JobStatus', jobStatusSchema);