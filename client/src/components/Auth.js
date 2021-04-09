import React from 'react'
import { withAuthenticationRequired } from "@auth0/auth0-react";

//!!- Er det riktig og eksportere denne?
export const Auth = ({children}) => {
	return (
		<>
			{children}
		</>
	)
}

export default withAuthenticationRequired(Auth, {
	onRedirecting: () => <h3>Loading...</h3>
})