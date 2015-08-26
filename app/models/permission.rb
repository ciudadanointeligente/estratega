class Permission < ActiveRecord::Base
  belongs_to :project
  belongs_to :user

  enum role: [:owner, :collaborator, :guest]
end
