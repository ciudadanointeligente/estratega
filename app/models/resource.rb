class Resource < ActiveRecord::Base
  belongs_to :project, touch: true
  validates :title, presence: true
  acts_as_taggable
end
