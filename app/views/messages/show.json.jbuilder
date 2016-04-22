json.extract! @message, :id, :description, :executed, :ask_id, :actor_id, :activity_id
json.created_at @message.created_at
json.updated_at @message.updated_at