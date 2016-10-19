class Actor < ActiveRecord::Base
  validates :name, presence: true
  has_and_belongs_to_many :objectives, touch: true
  has_many :messages
  has_and_belongs_to_many :activities
  has_and_belongs_to_many :asks

  def actor_type_list
    return I18n.t "objectives.actors_modal.actor_type_list"
  end

  def actor_support_list
    return I18n.t "objectives.actors_modal.support_list"
  end

  def actor_influence_level_list
    return I18n.t "objectives.actors_modal.influence_level_list"
  end
end
