import React from 'react'
import { injectGlobal } from 'emotion'
import Switcher from './Switcher'
import { I18nProvider } from 'lingui-react'
import { unpackCatalog } from 'lingui-i18n'
import en from './locale/en/messages.js'
import fr from './locale/fr/messages.js'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AlphaBanner from './AlphaBanner'
import FederalBanner from './FederalBanner'
import Footer from './Footer'
import { fontWeight, colours, spacing, fontSizes } from './styles'

const catalogs = { en: unpackCatalog(en), fr: unpackCatalog(fr) }

// required in development only (huge dependency)
const dev =
  process.env.NODE_ENV !== 'production' ? require('lingui-i18n/dev') : undefined

injectGlobal`

	html, body {
    padding: 0;
		margin: 0;
		background: ${colours.white};
		min-height: 100%;
    font-family: ${fontWeight.light}, sans serif;
    font-size: ${fontSizes.md};
	}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  svg {
    font-size: 1.4em;
  }

	h1 {
    font-family: ${fontWeight.bold}, sans serif;
		font-size: ${fontSizes.xl};
    margin-bottom: ${spacing.lg}px;
	}

	h2 {
    font-family: ${fontWeight.bold}, sans serif;
    font-size: ${fontSizes.lg};
    margin-bottom: 0px;
	}

	h3 {
    font-family: ${fontWeight.bold}, sans serif;
    font-size: ${fontSizes.md};
    margin-bottom: 0px;
	}

  p, a {
		line-height: 1.45;
	}

  p {
    margin-bottom: ${spacing.lg}px;
  }

	a {
		color: ${colours.blue};
    padding-right: ${spacing.md}px;
	}

  form  {
    margin-bottom: ${spacing.xl}px;

    h2 {
      margin-bottom: ${spacing.sm}px;
    }

    p {
      margin-bottom: ${spacing.md}px;
    }

    hr {
      border: none;
      border-bottom: 2px ${colours.greyLight} solid;
      margin-bottom: ${spacing.xl}px;
    }
  }

	#info {
		top: 5px;
		left: 5px;
		display: inline;
	}

#page-body {
    margin: 0px;
    padding: ${spacing.xl}px ${spacing.xxxl}px;
  }

  .bottom-link {
    padding-left: ${spacing.xs}px;
  }

`

const App = ({ lang }) => (
  <I18nProvider language={lang} catalogs={catalogs} development={dev}>
    <div>
      <link
        rel="stylesheet"
        media="screen"
        href="https://fontlibrary.org/face/hk-grotesk"
        type="text/css"
      />
      <AlphaBanner />
      <FederalBanner />
      <Switcher />
      <Footer />
    </div>
  </I18nProvider>
)

App.propTypes = {
  lang: PropTypes.string,
}

const mapStateToProps = state => ({
  lang: state.language,
})

export default connect(mapStateToProps)(App)
