export default interface IGetBoardsResponse{
    Response: {
        details: {
            board: [
                {
                    boardId: number,
                    createdBy: number,
                    createdDate: Date,
                    currentState: string,
                    modifiedBy: number,
                    modifiedDate: Date,
                    personRole: number,
                    projectName: string,
                    projectNumber: number
                }
            ]
        },
        messageView: {
            type: string,
            message: [string],
            uriMap: {
                selfUri: string
            }
        }
    }
}