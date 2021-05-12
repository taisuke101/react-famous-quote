export const getMeQuery = `
	query getMe {
		getMe {
			id
			username
		}
	}
`;

export const createUserMutation = `
    mutation createUser( $data: CreateUserInput! ) {
        createUser( data: $data ) {
            id
            username
            email
            password
        }
    }
`;

export const login = `
	mutation login(
		$usernameOrEmail: String!
		$password: String!
		) {
		login (
			usernameOrEmail: $usernameOrEmail,
			password: $password
		) {
			id
			username
		}
	}
`;

export const logout = `
	mutation logout {
		logout
	}
`;

export const forgotPassword = `
	mutation forgotPassword($email: String!) {
		forgotPassword(email: $email)
	}
`;

export const changePassword = `
	mutation changePassword(
		$data: ChangePasswordInput!
		$token: String!
	) {
		changePassword(
			data: $data,
			token: $token
		) {
			id
			username
		}
	}

`;
