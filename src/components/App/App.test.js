import React from 'react'
import App from './App'
import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../apiCalls')
import { getUrls } from '../../apiCalls'

describe('App', () => {

  getUrls.mockResolvedValue(
    {urls: 
      [
        {
          "id": 1,
          "long_url": "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
          "short_url": "http://localhost:3001/useshorturl/1",
          "title": "Awesome photo"
        }, {
          "title": "Cool Beans",
          "long_url": "https://www.thrashermagazine.com/articles/videos/sk8mafia-s-2020-promo-video/",
          "id": 2,
          "short_url": "http://localhost:3001/useshorturl/2"
        }, {
          "title": "Hello",
          "long_url": "https://www.instagram.com/p/CDM5qUeJA5a/?hl=en",
          "id": 3,
          "short_url": "http://localhost:3001/useshorturl/3"
        }
      ]
    }
  )
      
  it('should render a header, the UrlForm and UrlContainer', () => {
    const { getByText, getByTestId } = render(<App />)
    
    const header = getByText('URL Shortener')
    const urlForm = getByTestId('form')
    const urlContainer = getByTestId('container')

    expect(header).toBeInTheDocument()
    expect(urlForm).toBeInTheDocument()
    expect(urlContainer).toBeInTheDocument()
  })

  it('should render saved urls to the dom', async () => {
    const { getByText } = render(<App />)

    const title1 = await waitFor(() => getByText('Awesome photo'))
    const title2 = await waitFor(() => getByText('Cool Beans'))
    const title3 = await waitFor(() => getByText('Hello'))

    expect(title1).toBeInTheDocument()
    expect(title2).toBeInTheDocument()
    expect(title3).toBeInTheDocument()
  })

  
})
