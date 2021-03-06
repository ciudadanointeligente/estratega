class ProjectPolicy
  attr_reader :user, :project

  def initialize(user, project)
    raise Pundit::NotAuthorizedError, "must be logged in" unless user
    @user = user
    @model = project
  end

  def show?
    if @model.users.include?(@user)
      true
    end
  end
end