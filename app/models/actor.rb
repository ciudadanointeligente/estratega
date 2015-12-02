class Actor < ActiveRecord::Base
  validates :name, presence: true
  has_and_belongs_to_many :objectives
  has_many :asks

  def actor_type_list
    actor_type = ['Oponentes activos con influencia', 'Oponentes activos sin influencia', 'Oponentes pasivos con influencia', 'Oponentes pasivos sin influencia', 'Neutrales con influencia', 'Neutrales sin influencia', 'Partidarios pasivos con influencia', 'Partidarios pasivos sin influencia', 'Partidarios activos con influencia', 'Partidarios activos sin influencia']
    return actor_type
  end

  def actor_support_list
    actor_support = {'Partidarios activos' => 2, 'Partidarios pasivos' => 1, 'Neutrales' => -1, 'Oponentes activos' => -2, 'Oponentes pasivos' => -3}
    return actor_support
  end

  def actor_influence_level_list
    actor_influence_level = {'Alta influencia' => 2, 'Mediana Influencia' => 1, 'Baja Influencia' => 0, '' => -1, 'Sin influencia' => -2}
    return actor_influence_level
  end
end
