import React, { useState, useEffect, createContext, useContext } from 'react';
import { API, Storage } from 'aws-amplify';

import { UserContext } from './UserContext';
import { MessageContext } from './MessageContext';

import { listReimbursements } from '../graphql/queries';
import { getUser } from '../graphql/queries';
import { createReimbursement, updateReimbursement } from '../graphql/mutations.js';


export const ReimbursementContext = createContext();

const ReimbursementContextProvider = ( props ) => {
    const [ requests, setRequests ] = useState( [] );
    const { user } = useContext( UserContext );
    const { handleSetMessage } = useContext( MessageContext );

    useEffect( () => {
        if ( user ) {
            if ( user.type === 'MANAGER' ) {
                getAllReimbursementRequests()
            } else if ( user.type === 'EMPLOYEE' ) {
                getAnEmployeesRequests()
            }
        }
    }, [ user ] )

    // employee submit new reimbursement reuquest 
    async function submitRequest( { amount, description, type, imageUrl } ) {
        if ( amount <= 0 || !description || type === '-' || imageUrl === '' ) {
            handleSetMessage( 'error', "Error submitting request. Please try again" )
            return
        }
        try {
            const result = await API.graphql( {
                query: createReimbursement,
                variables: {
                    input: {
                        amount: amount,
                        description: description,
                        reimbursementType: type,
                        status: 'PENDING',
                        imageUrl: imageUrl,
                        userId: user.id,
                    },
                },
            } );

            if ( result ) {
                const newRequest = result.data.createReimbursement;
                let imageLink = ''
                // create signed url for image if one exists
                if ( imageUrl ) {
                    imageLink = await Storage.get( imageUrl )
                }
                setRequests( [ { ...newRequest, imageUrl: imageLink }, ...requests ] );
                handleSetMessage( 'info', "Request submitted" )
            } else {
                console.log( 'APP: ADD REQUEST ERROR ' );
            }
        } catch ( error ) {
            console.log( error );
            handleSetMessage( 'error', 'Error submitting request. Please try again.' )
        }
        // setRequests( [ ...reimbursementRequests, requestData ] )
    }

    // Retrieves ALL reimbursement requests for managers
    async function getAllReimbursementRequests() {
        try {
            const result = await API.graphql( {
                query: listReimbursements,
            } );

            if ( result.data.listReimbursements.items ) {
                const reimbursements = result.data.listReimbursements.items

                // generate signed urls for images 
                const reqsWithSignedUrls = await Promise.all( reimbursements.map( async el => {
                    const signedUrl = await Storage.get( el.imageUrl )
                    return { ...el, imageUrl: signedUrl }
                } ) )
                setRequests( reqsWithSignedUrls );
            }
        } catch ( err ) {
            console.log( err );
        }
    }


    async function getAnEmployeesRequests() {
        // get a single employee's records 
        try {
            const result = await API.graphql( {
                query: getUser,
                variables: { id: user.id },
            } );

            if ( result.data.getUser.reimbursements.items ) {
                const reimbursements = result.data.getUser.reimbursements.items

                // generate signed urls for images 
                const reqsWithSignedUrls = await Promise.all( reimbursements.map( async el => {
                    const signedUrl = await Storage.get( el.imageUrl )
                    return { ...el, imageUrl: signedUrl }
                } ) )
                setRequests( reqsWithSignedUrls );
            } else {
                handleSetMessage( 'info', 'There are no requests' )
            }

        } catch ( err ) {
            console.log( err )
            handleSetMessage( 'error', err.message )
        }
    }

    async function handleApproveReq( id ) {
        try {
            await API.graphql( {
                query: updateReimbursement,
                variables: {
                    input: { id: id, status: 'APPROVED', resolvedBy: user.id },
                },
            } );

            // update state
            const updatedReqs = requests.map( ( req ) =>
                req.id === id
                    ? { ...req, status: 'APPROVED', resolvedBy: user.id }
                    : req
            );
            setRequests( updatedReqs );
            handleSetMessage( 'info', 'Reimbursement approved' )
        } catch ( err ) {
            console.log( 'Error approving request' );
            console.log( err );
            handleSetMessage( 'error', err.message )
        }
    }

    async function handleDenyReq( id ) {
        try {
            await API.graphql( {
                query: updateReimbursement,
                variables: {
                    input: { id: id, status: 'DECLINED', resolvedBy: user.id },
                },
            } );

            // update state
            const updatedReqs = requests.map( ( req ) =>
                req.id === id
                    ? { ...req, status: 'DECLINED', resolvedBy: user.id }
                    : req
            );
            setRequests( updatedReqs );
            handleSetMessage( 'info', 'Reimbursement denied' )

        } catch ( err ) {
            console.log( 'Error approving request' );
            console.log( err );
            handleSetMessage( 'error', err.message )
        }
    }




    return (
        <ReimbursementContext.Provider value={{ getAllReimbursementRequests, submitRequest, requests, getAnEmployeesRequests, handleApproveReq, handleDenyReq, setRequests }} >
            {props.children}
        </ReimbursementContext.Provider >
    );

}


export default ReimbursementContextProvider