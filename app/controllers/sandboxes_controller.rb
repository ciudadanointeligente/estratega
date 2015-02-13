class SandboxesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_sandbox, only: [:show, :edit, :update, :destroy]

  # GET /sandboxes
  # GET /sandboxes.json
  def index
    @sandboxes = Sandbox.where(user_id: current_user)
    @public_sandboxes = Sandbox.where("public = ? AND user_id != ?", true, current_user)
    render :layout => "application"
  end

  # GET /sandboxes/1
  # GET /sandboxes/1.json
  def show
    sandbox = Sandbox.find(params[:id])
    @owner = sandbox.user_id == current_user.id ? true : false
    render :layout => "sandboxes"
  end

  # GET /sandboxes/new
  def new
    @sandbox = Sandbox.new
    render :layout => "application"
  end

  # GET /sandboxes/1/edit
  def edit
    render :layout => "application"
  end

  # POST /sandboxes
  # POST /sandboxes.json
  def create
    @sandbox = Sandbox.new(sandbox_params)
    @sandbox.user_id = current_user.id
    
    respond_to do |format|
      if @sandbox.save
        format.html { redirect_to @sandbox, notice: 'Sandbox was successfully created.' }
        format.json { render :show, status: :created, location: @sandbox }
      else
        format.html { render :new }
        format.json { render json: @sandbox.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sandboxes/1
  # PATCH/PUT /sandboxes/1.json
  def update
    sandbox = Sandbox.find(params[:id])
    owner = sandbox.user_id == current_user.id ? true : false
    if(owner)
      respond_to do |format|
        if @sandbox.update(sandbox_params)
          format.html { redirect_to @sandbox, notice: 'Sandbox was successfully updated.' }
          format.json { render :show, status: :ok, location: @sandbox }
        else
          format.html { render :edit }
          format.json { render json: @sandbox.errors, status: :unprocessable_entity }
        end
      end
    end
  end

  # DELETE /sandboxes/1
  # DELETE /sandboxes/1.json
  def destroy
    @sandbox.destroy
    respond_to do |format|
      format.html { redirect_to sandboxes_url, notice: 'Sandbox was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sandbox
      @sandbox = Sandbox.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def sandbox_params
      params.require(:sandbox).permit(:name, :description, :graph_data, :public)
    end
end
