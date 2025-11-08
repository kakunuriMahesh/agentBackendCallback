const router = require('express').Router();
const JobStatus = require('../models/JobStatus');

router.get('/:jobId', async (req, res, next) => {
  try {
    console.log('GET /api/jobs →', req.params.jobId);

    const job = await JobStatus.findOne({
      $or: [
        {jobId: req.params.jobId},
        {'body.jobId': req.params.jobId},
      ],
    }).lean();

    console.log('Query result:', job ? 'found' : 'not found');

    if (!job) {
      return res.status(404).json({message: 'Job not found'});
    }

    const resolvedJobId = job.jobId || job.body?.jobId || req.params.jobId;
    const status = job.status || job.body?.status || 'unknown';

    const payload =
      job.output ??
      job.body?.output ??
      job.body ??
      null;

    return res.json({
      jobId: resolvedJobId,
      status,
      output: payload,
      body: job.body ?? null,
      updatedAt: job.updatedAt,
    });
  } catch (err) {
    console.error('Job lookup failed:', err);
    return next(err);
  }
});

module.exports = router;