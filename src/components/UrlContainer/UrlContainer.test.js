import React from 'react'
import UrlContainer from './UrlContainer'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import { deleteUrl } from '../../apiCalls';


describe('UrlContainer', () => {
  const sampleUrls = [
    {
      "title": "Cool Beans",
      "long_url": "https://www.thrashermagazine.com/articles/videos/sk8mafia-s-2020-promo-video/",
      "id": 1,
      "short_url": "http://localhost:3001/useshorturl/2"
    }
  ]

  it('should display urls', () => {
    const { getByText } = render(<UrlContainer urls={sampleUrls}/>)

    const title = getByText('Cool Beans')
    const longUrl = getByText('https://www.thrashermagazine.com/articles/videos/sk8mafia-s-2020-promo-video/')
    const shortUrl = getByText('http://localhost:3001/useshorturl/2')

    expect(title).toBeInTheDocument()
    expect(longUrl).toBeInTheDocument()
    expect(shortUrl).toBeInTheDocument()
  })

  it('should be able to delete a url', () => {
    const mockDelete = jest.fn()
    const { getByRole } = render(
      <UrlContainer 
        urls={sampleUrls} 
        deleteUrl={mockDelete}
        
      />
    )
    
    const deleteBtn = getByRole('button', {name: 'Delete'})
    fireEvent.click(deleteBtn)

    expect(mockDelete).toHaveBeenCalledTimes(1)
  })
})