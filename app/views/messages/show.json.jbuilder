json.extract! @message, :id, :description, :executed, :ask_id
json.actor @message.actor
json.created_at @message.created_at
json.updated_at @message.updated_at