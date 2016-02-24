json.extract! @message, :id, :description, :executed, :ask_id, :actor_id
#json.actor_id @message.actor.id
json.created_at @message.created_at
json.updated_at @message.updated_at