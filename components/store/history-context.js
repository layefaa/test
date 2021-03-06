import { useRouter } from 'next/router'
import { createContext, useEffect } from 'react'
import { useLocalStorage } from 'react-use'

const HistoryContext = createContext({
  history: []
})

export function HistoryContextProvider(props) {
  const [history, setHistory] = useLocalStorage('visitedChapters', [])
  const router = useRouter()

  useEffect(() => {
    // update history array with every page visit
    if (!history.includes(router.asPath)) {
      setHistory([...history, router.asPath])
    }
  }, [router.asPath, setHistory, history])

  const context = {
    history: history
  }

  return (
    <HistoryContext.Provider value={context}>
      {props.children}
    </HistoryContext.Provider>
  )
}

export function OptionalHistoryContextProvider(props) {
  return process.env.NEXT_PUBLIC_PAGE_TRACKING_ENABLED == 0 ? (
    props.children
  ) : (
    <HistoryContextProvider>{props.children}</HistoryContextProvider>
  )
}

export default HistoryContext
