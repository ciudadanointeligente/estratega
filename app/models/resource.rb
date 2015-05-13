class Resource < ActiveRecord::Base
  belongs_to :project
  validates :title, presence: true
  acts_as_taggable
end
