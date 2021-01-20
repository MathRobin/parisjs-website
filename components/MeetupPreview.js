import { FormattedDate } from 'react-intl'
import { LocalLink } from '../lib/intl'
// import { Highlight } from 'react-instantsearch-dom'

import TalkPreview from './TalkPreview'

const Host = function ({ host, meetup }) {
  if (!host) return <span />
  const h =
    meetup._highlightResult && meetup._highlightResult.length > 0 ? (
      <Highlight hit={meetup} attributeName="host" />
    ) : (
      host
    )
  return <span>@ {h}</span>
}

const PagePreview = (meetup) => {
  const { id, edition, date, talks, host } = meetup
  const pageDate = date ? new Date(date) : null

  return (
    <LocalLink to={`/meetup/${id}`} className="MeetupPreview">
      <div className="MeetupPreview__title">
        <h3>
          Paris.js #{edition} <Host host={host} meetup={meetup} />
        </h3>
        <div>
          <time key={pageDate.toISOString()}>
            <FormattedDate
              value={pageDate}
              weekday="short"
              day="2-digit"
              month="long"
              year="numeric"
            />
          </time>
        </div>
      </div>

      <div className="MeetupPreview__talks">
        {talks &&
          talks.map((talk, i) => {
            const highlights = meetup._highlightResult
              ? { _highlightResult: meetup._highlightResult.talks[i] }
              : undefined
            return (
              <TalkPreview
                key={talk.title}
                talk={talk}
                highlights={highlights}
              />
            )
          })}
        {talks && talks.length % 2 > 0 && <div className="TalkPreview" />}
      </div>
    </LocalLink>
  )
}

export default PagePreview
