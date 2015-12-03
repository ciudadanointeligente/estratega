class Outcome < ActiveRecord::Base
  validates :title, presence: true
  belongs_to :objective
  has_and_belongs_to_many :activities

  def type_list
    return I18n.t "objectives.stage4.interim_outcome_type_list"
  end
end
