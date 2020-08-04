import React from 'react'
import UrlContainer from './UrlContainer'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';


describe('UrlContainer', () => {
  it('should display urls', () => {
    const sampleUrls = [
      {
        "title": "Cool Beans",
        "long_url": "https://www.thrashermagazine.com/articles/videos/sk8mafia-s-2020-promo-video/",
        "id": 1,
        "short_url": "http://localhost:3001/useshorturl/2"
      }
    ]

    const { getByText } = render(<UrlContainer urls={sampleUrls}/>)

    const title = getByText('Cool Beans')
    const longUrl = getByText('https://www.thrashermagazine.com/articles/videos/sk8mafia-s-2020-promo-video/')
    const shortUrl = getByText('http://localhost:3001/useshorturl/2')

    expect(title).toBeInTheDocument()
    expect(longUrl).toBeInTheDocument()
    expect(shortUrl).toBeInTheDocument()
  })
})