import React from 'react';
import blank from './blank';
import scraper from './scraper';
import hoc from './hoc';

export default hoc(blank, scraper, "address");