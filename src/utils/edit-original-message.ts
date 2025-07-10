import { EditOriginalMessageArgs } from "../dtos/types"

export const editOriginalMessage = async ({appId, token, content}: EditOriginalMessageArgs)=>{
    return await fetch(`https://discord.com/api/v10/webhooks/${appId}/${token}/messages/@original`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            content
        })
    })
}