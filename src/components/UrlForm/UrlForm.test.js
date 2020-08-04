import React from 'react'
import UrlForm from './UrlForm'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

describe('UrlForm', () => {
  it('should render inputs and a submit button', () => {
    const { getByPlaceholderText, getByRole } = render(<UrlForm />)

    const titleInput = getByPlaceholderText('Title...')
    const urlInput = getByPlaceholderText('URL to Shorten...')
    const button = getByRole('button', {name: 'Shorten Please!'})

    expect(titleInput).toBeInTheDocument()
    expect(urlInput).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('should update inputs while typing', () => {
    const { getByPlaceholderText, getByDisplayValue } = render(<UrlForm />)

    const titleInput = getByPlaceholderText('Title...')
    const urlInput = getByPlaceholderText('URL to Shorten...')

    fireEvent.change(titleInput, { target: { value: 'Test Title' } })
    fireEvent.change(urlInput, { target: { value: 'Test URL' } })

    const typedTitle = getByDisplayValue('Test Title')
    const typedUrl = getByDisplayValue('Test URL')

    expect(typedTitle).toBeInTheDocument()
    expect(typedUrl).toBeInTheDocument()
  })

  it('should fire a function on submit', () => {
    const mockSaveUrl = jest.fn()
    const { getByPlaceholderText, getByRole } = render(<UrlForm saveUrl={mockSaveUrl}/>)

    const titleInput = getByPlaceholderText('Title...')
    const urlInput = getByPlaceholderText('URL to Shorten...')
    const button = getByRole('button', { name: 'Shorten Please!' })

    fireEvent.change(titleInput, { target: { value: 'Test Title' } })
    fireEvent.change(urlInput, { target: { value: 'Test URL' } })
    
    fireEvent.click(button)
    expect(mockSaveUrl).toHaveBeenCalledTimes(1)
  })

  it('should alert the user if no inputs are received', () => {
    const { getByText, getByRole } = render(<UrlForm saveUrl={jest.fn()}/>)

    const button = getByRole('button', { name: 'Shorten Please!' })

    fireEvent.click(button)
    
    const warning = getByText('COMPLETE THE FORM')
    expect(warning).toBeInTheDocument()
  })
})