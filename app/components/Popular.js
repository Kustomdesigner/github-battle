import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from './fetchPopularRepos'


function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
    
    return (
      <ul className='flex-center'>
        {languages.map((language) => (
          <li key={language}>
            <button
              className='btn-clear nav-link langbtn'
              style={language === selected ? { background:'#eee', color: 'rgb(187, 46, 31)'} : null}
              onClick={() => onUpdateLanguage(language)}
            >
              {language}
            </button>
          </li>
        ))}
      </ul>
    )
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
}


class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All',
      repos: null,
      error: null
    }

    this.updateLanguage = this.updateLanguage.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null,
      repos: null
    })

    fetchPopularRepos(selectedLanguage)
      .then((repos) => this.setState({
        repos,
        error: null
      }))
      .catch((err) => {
        console.warn('Error fetching repos: ', err)

        this.setState({
          error: `There was an error fetching the respositories`
        })
      })
    }
    
    isLoading() {
      return this.state.repos === null && this.state.error === null
    }
  render() {
    const { selectedLanguage, repos, error } = this.state

    return (
      <React.Fragment>
        <LanguagesNav 
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <p>LOADING</p>}

        {error && <p>{error}</p>}

        {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
      </React.Fragment>
    )
  }
}

export default Popular