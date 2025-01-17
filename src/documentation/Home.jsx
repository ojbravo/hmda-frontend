import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../common/Heading.jsx'
import YearSelector from '../common/YearSelector.jsx'
import FAQs from './FAQs.jsx'
import FigLinks from './FigLinks.jsx'
import Publications from './publications'
import Tools from './tools'
import { DOCS_YEARS } from '../common/constants/years.js'
import { ExternalLink } from '../common/ExternalLink'

const Home = props => {
  const { year, url } = props
  return (
    <div className='home'>
      <div className='intro'>
        <Header type={1} headingText='HMDA Documentation'>
          <p className='lead'>A collection of HMDA Documentation Resources</p>
        </Header>
      </div>
      <YearSelector year={year} url={url} years={DOCS_YEARS} />
      <div>
        <h2>
          <Link to={`/documentation/${year}/faqs/`}>
            Frequently Asked Questions
          </Link>
        </h2>
        <FAQs year={year} />
      </div>
      <div>
        <h2>
          <Link to={`/documentation/${year}/fig/`}>
            Filing Instructions Guide (FIG)
          </Link>
        </h2>
        <FigLinks year={year} />
      </div>
      <div>
        <h2>
          <Link to={`/documentation/${year}/publications/`}>
            HMDA Publications
          </Link>
        </h2>
        <Publications year={year} />
      </div>
      <div>
        <h2>
          <Link to={`/documentation/${year}/tools/`}>HMDA Tools</Link>
        </h2>
        <Tools year={year} />
      </div>
      <div>
        <h2>HMDA APIs</h2>
        <p>
          Endpoints, schemas, and examples to help you access HMDA Data via the
          HMDA APIs.
        </p>
        <ul>
          <li>
            <ExternalLink
              url='https://cfpb.github.io/hmda-platform/'
              text='HMDA APIs - Overview'
            />
          </li>
          <li>
            <ExternalLink
              url='https://cfpb.github.io/hmda-platform/#data-browser-api'
              text='HMDA Data Browser API'
            />
          </li>
          <li>
            <ExternalLink
              url='https://cfpb.github.io/hmda-platform/#hmda-filing-api'
              text='HMDA Filing API'
            />
          </li>
          <li>
            <ExternalLink
              url='https://cfpb.github.io/hmda-platform/#hmda-public-verification-api'
              text='HMDA Public Verification API'
            />
          </li>
          <li>
            <ExternalLink
              url='https://cfpb.github.io/hmda-platform/#rate-spread-rate-spread-api'
              text='HMDA Rate Spread API'
            />
          </li>
          <li>
            <ExternalLink
              url='https://cfpb.github.io/hmda-platform/#check-digit'
              text='HMDA Check Digit API'
            />
          </li>
          <li>
            <ExternalLink
              url='https://cfpb.github.io/hmda-platform/#hmda-file-serving'
              text='HMDA File Serving API'
            />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Home
